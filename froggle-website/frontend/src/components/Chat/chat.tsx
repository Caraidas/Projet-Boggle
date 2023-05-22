import React, { useEffect } from "react"
import Game from "../../pages/game"
import "../../css/styleGame.css"
import Header from "../Header"
import SalonsGrid from "../SalonsGrid"


export interface WaitingRoom {
    name: string
    attendeeNumber: number
    description: string
}

export interface Message {
    sender: string
    timestamp: number
    content: string
}
/**
 * Renders the waiting room selector with all waiting room (should be an actual selector in the react app and not a radio button)
 */
export const WaitingRoomSelector = (props: {rooms: WaitingRoom[], onChosenRoom: (username: string, waitingRoom: string) => void}) => {
    const [username, setUsername] = React.useState("")
    const [selectedRoom, setSelectedRoom] = React.useState("")

    return (
    <div className="WaitingRoomSelector">
        <div>Nom d'utilisateur: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /></div>
        {/* Renders all the waiting rooms */}
        <div>
            {props.rooms.map(room => <div key={room.name}>
                <input type="radio" name="room" value={room.name} checked={selectedRoom === room.name} onChange={() => setSelectedRoom(room.name)} />
                {room.name}@{room.attendeeNumber} ({room.description})
            </div>)}
        </div>
        {/* Join the waiting room */}
        <button onClick={() => props.onChosenRoom(username, selectedRoom)} disabled={username === "" || selectedRoom === "" || props.rooms.findIndex(x => x.name === selectedRoom) === -1}>Rejoindre le salon d'attente</button>
    </div>
    );
}

/**
 * 
 * @returns room waiter with a time counter & a leave button
 */
export const RoomWaiter = (props: {roomName: string, startTimestamp: number, onLeaving: () => void}) => {
    const [currentTimestamp, setCurrentTimestamp] = React.useState(performance.now())
    //time counter
    React.useEffect(() => {
        const handle = setInterval(() => setCurrentTimestamp(performance.now()), 1000)
        return () => clearTimeout(handle)
    }, [])
    return <div className="RoomWaiter">
        <div>En attente d'autres joueurs dans le salon{props.roomName} depuis {Math.floor((currentTimestamp - props.startTimestamp) / 1000)} s.</div>
        {/* button to leave waiting room, calls the leaveWaitingRoom() funtion */}
        <div><button onClick={() => props.onLeaving() }>Quitter le salon d'attente</button></div>
    </div>
}

/**
 * 
 * @returns renders a message
 */
export const ChatMessageDisplayer = (props: {message: Message}) => {
    const date = React.useMemo(() => new Date(props.message.timestamp).toLocaleTimeString(), [props.message.timestamp])

    return (
        <>  
            <div>{date}</div>
            <div>{props.message.sender}</div>
            <div style={{flex: 1}}>{props.message.content}</div>
        </>
    );
}

/**
 * 
 * @returns renders a list of messages
 */
export const ChatMessagesDisplayer = (props: {messages: Message[]}) => {
    return <ol className="ChatMessagesDisplayer">
        {props.messages.map((x, i) => <li key={i}><ChatMessageDisplayer message={x} /></li>)}
    </ol>
}

/**
 * 
 * @returns the input message bar
 */
export const MessageSender = (props: {onMessageWritten: (content: string) => void}) => {
    const [content, setContent] = React.useState("")
    return <div className="MessageSender">
        <input type="text" value={content} style={{flex: 1}} onChange={event => setContent(event.target.value)} />
        <button onClick={() => {props.onMessageWritten(content); setContent('')}}>Send</button>
    </div>
}

/**
 * 
 * @returns the page with the chat session (messages list, pratical informations)
 */
export const ChatSession = (props: {messages: Message[], active: boolean, onMessageWritten: (content: string) => void, onLeaving: () => void, onClosing: () => void, grid: string, setMusic: (music: any) => void, solvedWords : any}) => {

    const [isChatToggled, setChatToggle] = React.useState(false);

    function chatToggleHandler() {
        if (!isChatToggled) {
            setChatToggle(true);
        } else {
            setChatToggle(false)
        }
    }

    return (
        <div className="ChatSession">
            <div className="toggleChat" onClick={() => chatToggleHandler()} style={{transform: isChatToggled? 'translateX(-400px)' : 'translateX(0px)'}}>Chat</div>
            <Game soundVolume={1} grid={props.grid} setMusic={props.setMusic} solvedWords={props.solvedWords} />
            <div className="chatCont" style={{transform: isChatToggled? 'translateX(0%)' : 'translateX(100%)'}}>
                <ChatMessagesDisplayer messages={props.messages} />
                {props.active && <MessageSender onMessageWritten={props.onMessageWritten} />}
                <div>
                    <button onClick={() => props.onLeaving()} disabled={!props.active}>Leave the chat session</button>
                    <button onClick={() => props.onClosing()} disabled={props.active}>Close</button>
                </div>
            </div>
        </div>
    );
}

interface DisconnectedState { disconnected: true }
interface ConnectingState { connecting: true }
interface RoomSelectionState { roomSelection: true }
interface WaitingState { startTimestamp: number, waitingRoomName: string }
interface ChattingState { startTimestamp: number, messages: Message[], active: boolean }
type ChatState = DisconnectedState | ConnectingState | RoomSelectionState | WaitingState | ChattingState //can be either of these


export const ChatManager = (props: {socketUrl: string, setMusic: (music: any) => void}) => {
    const [chatState, setChatState] = React.useState<ChatState>({disconnected: true})
    const [connected, setConnected] = React.useState(false)
    const [socket, setSocket] = React.useState<WebSocket|null>(null)
    const [error, setError] = React.useState<string>('')
    const [waitingRooms, setWaitingRooms] = React.useState<WaitingRoom[]>([])
    const [grid, setGrid] = React.useState("");
    const [solvedWords, setSolvedWords] = React.useState("");

    const onNewSocketMessage = (kind: string, content: Record<string, any>) => {
        console.debug("Received message from websocket", content)
        const addChatMessage = (sender: string, content: string) => {
            let message: Message = {sender: sender, timestamp: Date.now(), content: content}
            setChatState(oldState => {
                if ('messages' in oldState)
                    return {...oldState, messages: [...oldState.messages, message]}
                else return oldState
            })
        }
        const readWaitingRooms = (c: Record<string, any>) => {
            let waitingRooms:WaitingRoom[] = []
            for (let [name, v] of Object.entries(c['waiting_rooms'])) {
                let value = v as any
                let room: WaitingRoom = {name: name, attendeeNumber: value.attendee_number, description: value.description}
                waitingRooms.push(room)
            }
            return waitingRooms
        }

        switch(kind) {
            case 'waiting_room_list':
                setWaitingRooms(readWaitingRooms(content))
                setChatState({roomSelection: true})
                break
            
            case 'in_waiting_room':
                let name = content.waiting_room_name
                setChatState({waitingRoomName: name, startTimestamp: performance.now()})
                break

            case 'waiting_room_left':
                setChatState({roomSelection: true})
                break

            case 'waiting_room_join_refused':
                setError(`Cannot join the room: ${content.reason}`)
                break

            case 'chat_session_started':
                setChatState({startTimestamp: performance.now(), messages: [], active: true})
                addChatMessage('admin', content.welcome_message)
                console.log("SLAU");
                console.log(content.grid);
                setGrid(content.grid);
                setSolvedWords(content.solvedWords);
                break

            case 'chat_message_received':
                addChatMessage(content.sender, content.content)
                break

            case 'attendee_left':
                addChatMessage('admin', `Attendee ${content.attendee} left the chat session.`)
                break

            case 'chat_session_left':
                setChatState(oldState => ('messages' in oldState)?{...oldState, active: false}:oldState)
                break

            case 'chat_session_ended':
                setChatState(oldState => ('messages' in oldState)?{...oldState, active: false}:oldState)
                addChatMessage('admin', "End of the chat session due to time limit.")
                addChatMessage('admin', content.exit_message)
                break

            case 'server_shutdown':
                setError('Server will shutdown now! Please reconnect later.')
                break
            
            default:
                setError(`Received non understable message: kind=${kind} content=${JSON.stringify(content)}`)
        }
    }

    /**
     * 
     */
    const sendToSocket = React.useCallback((kind: string, body: Record<string, any>) => {
        const to_send = {kind: kind, ...body}
        const stringified = JSON.stringify(to_send)
        console.debug(`Sending message on the websocket`, to_send)
        socket?.send(stringified)
    }, [socket])

    const connectToWaitingRoom = React.useCallback((username: string, waitingRoomName: string) => {
        sendToSocket('join_waiting_room', {'token': username, 'waiting_room_name': waitingRoomName})
    }, [sendToSocket])
    const leaveWaitingRoom = React.useCallback(() => {
        sendToSocket('leave_waiting_room', {})
    }, [sendToSocket])
    const sendChatMessage = React.useCallback((content: string) => {
        sendToSocket('send_chat_message', {content: content})
    }, [sendToSocket])
    const leaveChatSession = React.useCallback(() => {
        sendToSocket('leave_chat_session', {})
    }, [sendToSocket])
    const closeChatSession = React.useCallback(() => {
        setChatState({roomSelection: true})
    }, [])


    useEffect(() => {
        if ('connecting' in chatState) {
            setConnected(true)
        } else if ('disconnected' in chatState) {
            setConnected(false)
        }
    }, [chatState])

    // create and configure a websocket
    useEffect(() => {
        if (connected) {
            console.debug(`Opening the websocket with the URL ${props.socketUrl}`)
            const newSocket = new WebSocket(props.socketUrl)
            setSocket(newSocket)
            newSocket.addEventListener('open', (event) => {
                setChatState({roomSelection: true})
            })
            newSocket.addEventListener('message', (event) => {
                const data = event.data
                if (typeof(data) === 'string') {
                    let json = {}
                    let kind = null
                    try {
                        json = JSON.parse(data)
                        kind = json['kind']
                        console.log(json)
                    } catch {
                        console.error("Received invalid JSON", data)
                    }
                    if (json !== null && kind !== null)
                        onNewSocketMessage(kind, json)
                }
            })
            newSocket.addEventListener('error', (event) => {
                console.error("WebSocket error", event)
                setChatState({disconnected: true})
                setError(`Websocket connection error: ${event}`)
            })
            newSocket.addEventListener('close', (event) => {
                console.error("WebSocket closed", event)
                setChatState({disconnected: true})
            })
            // close the socket
            return () => {
                newSocket.close()
                setWaitingRooms([])
                setSocket(null)
            }
        }
    }, [connected, props.socketUrl])

    return (
        <div>
            {error !== '' && 
                <div className="Error">Error: {error} <button onClick={() => setError('')}>OK</button></div>}
            {'disconnected' in chatState && 
                <>
                <Header text="Salons" />
                <div className="salonsCont">
                    <div>Vous êtes déconnecté</div>
                    <button onClick={() => setChatState({connecting: true})}>Se connecter</button>
                </div>
                </>}  
                
            {'connecting' in chatState &&
            <>
                <Header text="Salons" />
                <div className="salonsCont">
                    <div>Connexion à la partie veuillez patienter... {props.socketUrl}</div>
                </div>
            </>}
            {'roomSelection' in chatState && 
                <>
                    <Header text="Salons" />
                    <div className="salonsCont">
                        <SalonsGrid rooms={waitingRooms} onChosenRoom={connectToWaitingRoom} />
                    </div>
                </>}
            {'waitingRoomName' in chatState &&
                <>
                    <Header text="Salons" />
                    <div className="salonsCont">                
                        <RoomWaiter roomName={chatState.waitingRoomName} startTimestamp={chatState.startTimestamp} onLeaving={leaveWaitingRoom} />
                    </div>
                </>}
            {'messages' in chatState && 
                <ChatSession messages={chatState.messages} active={chatState.active} onMessageWritten={sendChatMessage} onLeaving={leaveChatSession} onClosing={closeChatSession} grid={grid} solvedWords={solvedWords} setMusic={props.setMusic} />
            }
        </div>
    );
}
package wiktionnary.wiktionnary;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class DictionnarySearcher {
	public static void main(String[] args)  throws IOException{
		
		String word = "patron";
    	RandomAccessFile rafDico = new RandomAccessFile("C:\\\\Users\\\\33768\\\\Documents\\\\GitHub\\\\Projet-Boggle\\\\Wikitionary\\\\src\\\\main\\\\java\\\\wiktionnary\\\\wiktionnary\\\\dico.txt","r");
    	RandomAccessFile rafIndex = new RandomAccessFile("C:\\\\Users\\\\33768\\\\Documents\\\\GitHub\\\\Projet-Boggle\\\\Wikitionary\\\\src\\\\main\\\\java\\\\wiktionnary\\\\wiktionnary\\\\index.bin","r");
    	int entryNumber = (int) (rafIndex.length() / 8);//nombre de couple de position dans l'index
    	System.out.println("Nombre de couple de positions: " + entryNumber);
    	
    	extractDefinition(rafDico, rafIndex, word,0,rafIndex.length(), entryNumber);
    	//System.out.println(searchWord(rafDico,indiceDeb, indiceFin));
    	rafIndex.close();
	}   
	  
	  
	public static String extractDefinition(RandomAccessFile rafDico, RandomAccessFile rafIndex, String word, long debut, long fin, long entryNumber) throws IOException {
		System.out.println("Nombre d'entrée: " +entryNumber);
		if(entryNumber == 0) {
			return "Mot non trouvé (nombre d'entrée à 0";
		}
		long indexMed = (entryNumber/2)*8 + debut;//récupérer l'index médian (arrondi)
    	System.out.println("Index médian dans le fichier: " + indexMed);
    	
		byte[] bytes = new byte[8];  
		System.out.println("index Med" + indexMed);
	    rafIndex.seek(indexMed);
	    rafIndex.read(bytes, 0, 8);
	    var bb = ByteBuffer.wrap(bytes);
	    int indiceDeb = bb.getInt();
	    int indiceFin = bb.getInt();
	    System.out.println(indiceDeb);
	    System.out.println(indiceFin);
	    ArrayList<String> arraySearch = searchWord(rafDico,indiceDeb, indiceFin);
	    String foundWord = arraySearch.get(0);
	    if(foundWord.compareTo(word) == 0) {
            System.out.println("Trouvé");
            return arraySearch.get(1);
	    }
	    
	    System.out.println("Compare to: " +foundWord.compareTo(word));
	    if(foundWord.compareTo(word) <= -1) {
	        extractDefinition(rafDico, rafIndex,word, indexMed + 8, fin, (fin - (indexMed)) / 8);
	    } else if(foundWord.compareTo(word) >= 1){
	        extractDefinition(rafDico, rafIndex,word, debut, indexMed, ((indexMed) - debut) / 8);    
	    }
		return "Mot non trouvé";
	}
	
	public static ArrayList<String> searchWord(RandomAccessFile raf, int posDeb, int posFin) throws IOException {
		ArrayList<String> returnVars = new ArrayList<>();
		byte[] meta = ("{\"created_on\":\"20221014T145610Z\",\"description\":\"definition file\",\"language\":\"fr\"}").getBytes("IBM01140");
		int metaLenght = meta.length;//les metadonnées au debut prennent de la place
		
		int taille = (posFin-posDeb);
		byte[] buffer = new byte[taille]; 
		raf.seek(posDeb+metaLenght);
		raf.read(buffer, 0, taille);
		String s = new String(buffer, StandardCharsets.UTF_8);
		
		int start = s.indexOf("title");
		String word = s.substring(start+8);
		word = word.trim();//supprimer les espaces en debut et fin de ligne
		word = word.replace("\"", "");//supprimer les guillemets
		System.out.println(word);
		returnVars.add(word);
		returnVars.add(s);
		return returnVars;
	}
} 


package wiktionnary.wiktionnary;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class DictionnarySearcher {
	public static void main(String[] args)  throws IOException{
		
		String word = "acceuil";
    	RandomAccessFile rafDico = new RandomAccessFile("C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\Wikitionary\\src\\main\\java\\wiktionnary\\wiktionnary\\dico.txt","r");
    	RandomAccessFile rafIndex = new RandomAccessFile("C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\Wikitionary\\src\\main\\java\\wiktionnary\\wiktionnary\\index.bin","r");
    	int entryNumber = (int) (rafIndex.length() / 8);//nombre de couple de position dans l'index
    	System.out.println("Nombre de couple de positions: " + entryNumber);
    	long indexMed = (long) Math.round(((float) entryNumber/2))*8;//récupérer l'index médian (arrondi)
    	System.out.println("Index médian dans le fichier: " +indexMed);
    	
    	byte[] bytes = new byte[8];  
    	rafIndex.seek(indexMed);
    	rafIndex.read(bytes, 0, 8);
    	var bb = ByteBuffer.wrap(bytes);
    	int indiceDeb = bb.getInt();
    	int indiceFin = bb.getInt();
    	System.out.println(indiceDeb);  
    	System.out.println(indiceFin);
    	extractDefinition(indexMed, rafDico, rafIndex, word);
    	System.out.println(searchWord(rafDico,indiceDeb, indiceFin));
    	rafIndex.close();
	}   
	  
	
	public static void extractDefinition(long indexMed, RandomAccessFile rafDico, RandomAccessFile rafIndex, String word) throws IOException {
		byte[] bytes = new byte[8];  
	    rafIndex.seek(indexMed);
	    rafIndex.read(bytes, 0, 8);
	    var bb = ByteBuffer.wrap(bytes);
	    int indiceDeb = bb.getInt();
	    int indiceFin = bb.getInt();
	    String foundWord = searchWord(rafDico,indiceDeb, indiceFin);
	    if(indiceDeb == indiceFin) {
	        if(foundWord.equals(word)) {
	            System.out.println("Trouvé");
	        } else {
	            System.out.println("Mot non trouvé");
	        }
	        return;
	    }
	    if(foundWord.compareTo(word) == -1) {
	        extractDefinition(indexMed + (indexMed/2), rafDico, rafIndex,word);
	    } else {
	        extractDefinition(indexMed - (indexMed/2), rafDico, rafIndex,word);
	    }
	}
	
	public static String searchWord(RandomAccessFile raf, int posDeb, int posFin) throws IOException {
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
		
		return word;
	}
} 


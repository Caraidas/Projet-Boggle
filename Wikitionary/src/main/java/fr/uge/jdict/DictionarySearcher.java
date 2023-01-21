package fr.uge.jdict;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;

public class DictionarySearcher {
	public static void main(String[] args)  throws IOException{
		boolean hasYaml= false;
		String word = args[1];
		if(word.contains("yaml:")) {
			word = word.substring(word.indexOf("yaml:")+5);
			hasYaml = true;
		}
		String wordNormalise = Normalizer.normalize(word, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
		wordNormalise.replace("Æ", "AE");
		wordNormalise.replace("Œ", "OE");
		boolean isNormalized = true;
		for(int i=0;i<word.length();i++){
			if (Character.isLowerCase(word.charAt(i))) {
				isNormalized = false;
				break;
			}
		}
    	RandomAccessFile rafDico = new RandomAccessFile(args[0]+".txt","r");
    	RandomAccessFile rafIndex = new RandomAccessFile("definitions.index","r");
    	int entryNumber = (int) (rafIndex.length() / 8);//nombre de couple de position dans l'index
    	String extract = extractDefinition(rafDico, rafIndex, wordNormalise,0,rafIndex.length(), entryNumber, isNormalized,word);
    	if(hasYaml) {
    		if(extract.charAt(0) != '{') {
    			System.out.println(extract);
    		}else{
    			System.out.println(asYaml(extractDefinition(rafDico, rafIndex, wordNormalise,0,rafIndex.length(), entryNumber, isNormalized,word)));
    		}
    	}
    	else System.out.println(extractDefinition(rafDico, rafIndex, wordNormalise,0,rafIndex.length(), entryNumber, isNormalized,word));
    	
    	rafIndex.close();
	}
	  
	public static ArrayList<String> checkSides(long entryNumber, long debut, RandomAccessFile rafIndex, boolean before,RandomAccessFile rafDico, String wordNormalise) throws IOException {
		ArrayList<String> t = new ArrayList<String>();
		if (before)
			debut = debut-8;
		else
			debut = debut+8;
		
		long indexMed = (entryNumber/2)*8 + debut;
		if (indexMed < 0 || indexMed > rafIndex.length())
			return t;
		byte[] bytes = new byte[8];
		
		
		rafIndex.seek(indexMed);
	    rafIndex.read(bytes, 0, 8);
	    var bb = ByteBuffer.wrap(bytes);
	    int indiceDeb = bb.getInt();
	    int indiceFin = bb.getInt();
	    ArrayList<String> arraySearch = searchWord(rafDico,indiceDeb, indiceFin);
	    String foundWord = Normalizer.normalize(arraySearch.get(0), Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
	    foundWord.replace("Æ", "AE");
	    foundWord.replace("Œ", "OE");
	    if(foundWord.compareTo(wordNormalise) == 0) {
	    	arraySearch.addAll(checkSides(entryNumber, debut, rafIndex, before, rafDico, wordNormalise));
            return arraySearch;
	    }
	    
		return t;
	}
	
	public static String extractDefinition(RandomAccessFile rafDico, RandomAccessFile rafIndex, String wordNormalise, long debut, long fin, long entryNumber, boolean isNormalized, String word) throws IOException {
		if(entryNumber == 0) {
			return "Mot non trouvé (nombre d'entrée à 0)";
		}
		long indexMed = (entryNumber/2)*8 + debut;//récupérer l'index médian (arrondi)
    	
		byte[] bytes = new byte[8];
	    rafIndex.seek(indexMed);
	    rafIndex.read(bytes, 0, 8);
	    var bb = ByteBuffer.wrap(bytes);
	    int indiceDeb = bb.getInt();
	    int indiceFin = bb.getInt();
	    ArrayList<String> arraySearch = searchWord(rafDico, indiceDeb, indiceFin);
	    String foundWord = Normalizer.normalize(arraySearch.get(0), Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
	    foundWord.replace("Æ", "AE"); 
	    foundWord.replace("Œ", "OE");
	    if(foundWord.compareTo(wordNormalise) == 0) {
	    	ArrayList<String> result = new ArrayList<String>();
	    	result.addAll(arraySearch);
	    	result.addAll(checkSides(entryNumber, debut, rafIndex, false, rafDico, wordNormalise));
	    	result.addAll(checkSides(entryNumber, debut, rafIndex, true, rafDico, wordNormalise));
	    	if(!isNormalized) {
	    		for(int i = 0; i<result.size();i += 2) {
	    			 if (result.get(i).compareTo(word) == 0)
	    				 return result.get(i+1);
	    		}
	    	}
	    	StringBuilder s = new StringBuilder();
	    	for(int i = 0; i<result.size();i ++) {
	    		if (i % 2 == 1) {
	    			s.append(result.get(i));
	    		}
	    	}
            return s.toString();
	    }
	    if(foundWord.compareTo(wordNormalise) <= -1) {
	        return extractDefinition(rafDico, rafIndex,wordNormalise, indexMed + 8, fin, (fin - (indexMed)) / 8,isNormalized,word);
	    } else if(foundWord.compareTo(wordNormalise) >= 1){
	        return extractDefinition(rafDico, rafIndex,wordNormalise, debut, indexMed, ((indexMed) - debut) / 8,isNormalized,word);    
	    }
	    
		return "Mot non trouvé";
	}
	
	public static ArrayList<String> searchWord(RandomAccessFile raf, int posDeb, int posFin) throws IOException {
		ArrayList<String> returnVars = new ArrayList<>();
		byte[] meta = ("{\"created_on\":\"20221014T145610Z\",\"description\":\"definition file\",\"language\":\"fr\"}\n").getBytes("IBM01140");
		int metaLenght = meta.length;//les metadonnées au debut prennent de la place
		
		int taille = (posFin-posDeb);
		byte[] buffer = new byte[taille]; 
		raf.seek(posDeb+metaLenght);
		raf.read(buffer, 0, taille);
		String s = new String(buffer, StandardCharsets.UTF_8);
		
		int start = s.indexOf("title");
		String wordNormalise = s.substring(start+8);
		wordNormalise = wordNormalise.trim();//supprimer les espaces en debut et fin de ligne
		wordNormalise = wordNormalise.replace("\"", "");//supprimer les guillemets
		if(wordNormalise.contains("}")) {
			wordNormalise =wordNormalise.replace("}", "");
		}
		returnVars.add(wordNormalise);
		returnVars.add(s);
		return returnVars;
	}
	
	public static String asYaml(String jsonString) throws JsonProcessingException, IOException {
        // parse JSON
        JsonNode jsonNodeTree = new ObjectMapper().readTree(jsonString);
        // save it as YAML
        String jsonAsYaml = new YAMLMapper().writeValueAsString(jsonNodeTree);
        return jsonAsYaml;
    }
} 


package fr.uge.jdict;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class NormalizedExtractor {
	

	
	public static void main(String[] args) throws IOException{
		
		List<String> mots = new ArrayList<String>();
		List<String> list = new ArrayList<String>();
		/*
		 * code avec arguments prenant seulement les genre que l'on souhaite passé en paramètre
		 */
		//list.add("adverbe");
		List<String> distinctElements  = list.stream().distinct().collect(Collectors.toList());
		boolean containGender = false;
		
		Reader r = new FileReader("C:\\Users\\paul_\\OneDrive\\Documents\\Bureau\\BUT2\\C\\projet\\Projet-Boggle\\Wikitionary\\src\\main\\java\\fr\\uge\\jdict\\dico.txt");
		BufferedReader br = new BufferedReader(r);
		String line = null;
		
		try (PrintWriter out = new PrintWriter(new FileWriter("C:\\Users\\paul_\\OneDrive\\Documents\\Bureau\\BUT2\\C\\projet\\Projet-Boggle\\Wikitionary\\src\\main\\java\\fr\\uge\\jdict\\listeMots.txt"))){

			while((line = br.readLine())!= null) {
	            for(String s:distinctElements) {
	            	if (line.contains('"'+s+'"')) {
	            		containGender = true;
	            		break;
	            	}
	            		
	            }
	            if(distinctElements.size() == 0 || containGender) {
	            	
		            line = line.substring(line.indexOf("\"title\":\"")+9);
		            line = line.substring(0,line.indexOf("\"}"));
		            line = Normalizer.normalize(line, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
		            line.replace("Æ", "AE");
		            line.replace("Œ", "OE");
		            if(!mots.contains(line)) {
		            	mots.add(line);
		            	System.out.println(line);
		            	out.write(line + "\n");
		            }
		            	
	            }
	            
		            
	        }
			out.close();
	        br.close();
		}catch (Exception e) {
		    e.printStackTrace();
		}
		
        System.out.println(mots);
	}
}

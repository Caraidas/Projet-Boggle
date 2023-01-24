package fr.uge.jdict;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class NormalizedExtractor {
	

	
	public static void main(String[] args) throws IOException{
		
		////////////////////////Initialisation des variables////////////////////////
		
		//liste contenant les genres des mots voulu
		List<String> list = new ArrayList<String>(); 
		if(args.length == 2) {
			String[] genre = args[1].split(",");
			for(String s : genre) {
				list.add(s);
			}
		}
		
		List<String> distinctElements  = list.stream().distinct().collect(Collectors.toList()); // permet d'éviter les duplicata parmis les genres passés en paramètre
		boolean containGender = false;
		
		Reader r = new FileReader(args[0]+".txt", StandardCharsets.UTF_8);
		BufferedReader br = new BufferedReader(r);
		String line = null;
		br.readLine();
		
		////////////////////////Extraction des mots////////////////////////
		while((line = br.readLine())!= null) {
			/*
			 * regarde parmis la liste des genres si le mot contient un des genres
			 * si c'est le cas alors le mot est affiché
			 */
            for(String s:distinctElements) { 
            	if (line.contains('"'+s+'"')) {
            		containGender = true;
            		break;
            	}
            }
            // si les genres ne sont pas spécifiés ou s'ils  font partie de la ligne
            if(distinctElements.size() == 0 || containGender) {
            	
            	// extraction du mot de la ligne
	            line = line.substring(line.indexOf("\"title\":\"")+9);
	            line = line.substring(0,line.indexOf("\"}"));
	            // normalisation du mot
	            line = Normalizer.normalize(line, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
	            line.replace("Æ", "AE");
	            line.replace("Œ", "OE");
	            
	            
	            containGender = false;
            	System.out.println(line);        	
            }        
        }

        br.close();
	}
}

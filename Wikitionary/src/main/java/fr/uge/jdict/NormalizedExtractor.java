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
		
		List<String> list = new ArrayList<String>();
		/*
		 * code avec arguments prenant seulement les genre que l'on souhaite passé en paramètre
		 */
		if(args.length == 2) {
			String[] genre = args[1].split(",");
			for(String s : genre) {
				list.add(s);
			}
		}
		//list.add("adverbe");
		List<String> distinctElements  = list.stream().distinct().collect(Collectors.toList());
		boolean containGender = false;
		
		Reader r = new FileReader(args[0]+".txt");
		BufferedReader br = new BufferedReader(r);
		String line = null;
		br.readLine();
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
		            containGender = false;
	            	System.out.println(line);        	
	            }        
	        }

	        br.close();
	}
}

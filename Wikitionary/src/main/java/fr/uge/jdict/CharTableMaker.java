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
import java.util.TreeMap;
import java.util.stream.Collectors;

public class CharTableMaker {
	
	public static void writeFrequence(TreeMap<Character,Integer> freq) throws IOException {
		
		int lastAmount = 0;
		for (Character c : freq.keySet()) {
			lastAmount += freq.get(c);
			System.out.println(c + " " + lastAmount);
		}
		
	}
	
	public static void main(String[] args) throws IOException{
		
		TreeMap<Character,Integer> frequence = new TreeMap<Character,Integer>();
		List<String> list = new ArrayList<String>();
		/*
		 * code avec arguments prenant seulement les genre que l'on souhaite passé en paramètre
		 */
		//list.add("adverbe");
		List<String> distinctElements  = list.stream().distinct().collect(Collectors.toList());
		boolean containGender = false;
		
		Reader r = new FileReader(args[0]+".txt");
		BufferedReader br = new BufferedReader(r);
		String line = null;
		
		while((line = br.readLine())!= null) {
            for(String s:distinctElements) {
            	if (line.contains('"'+s+'"')) {
            		containGender = true;
            		break;
            	}
            		
            }
            if(distinctElements.size() == 0 || containGender) {
            	line = Normalizer.normalize(line, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
	            line.replace("Æ", "AE");
	            line.replace("Œ", "OE");
	            for(int i=0;i<line.length();i++){
					if (line.charAt(i) == 'Q' && i < line.length()-1) {
						if (line.charAt(i+1) == 'U') {
							int nb = frequence.getOrDefault('&', 0);
	    					frequence.put('&', nb + 1);
	    					i++;
						}
					}
					else if(Character.isAlphabetic(line.charAt(i))){
						int nb = frequence.getOrDefault(line.charAt(i), 0);
						frequence.put(line.charAt(i), nb + 1);
					}
					
		        }
	            containGender = false;
            }
	            
        }
        br.close();
	
        writeFrequence(frequence);
	}
}

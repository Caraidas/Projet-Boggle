package fr.uge.jdict;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.text.Normalizer;
import java.util.TreeMap;

public class CharTableMaker {
	
	
	/**
	 * fonction permettant d'afficher le TreeMap sous le format : lettre montant
	 * @param freq Tree map avec pour clé les caracteres et pour valeur Integer
	 * @throws IOException
	 */
	public static void writeFrequence(TreeMap<Character,Integer> freq) throws IOException {
		
		int lastAmount = 0;
		for (Character c : freq.keySet()) {
			lastAmount += freq.get(c);
			System.out.println(c + " " + lastAmount);
		}
		
	}
	
	public static void main(String[] args) throws IOException{
		
		TreeMap<Character,Integer> frequence = new TreeMap<Character,Integer>();
		
		Reader r = new FileReader(args[0]+".txt");
		BufferedReader br = new BufferedReader(r);
		String line = null;
		
		while((line = br.readLine())!= null) {
			//normalisation de la ligne
        	line = Normalizer.normalize(line, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").toUpperCase();
            line.replace("Æ", "AE");
            line.replace("Œ", "OE");
            
            //regarde parmis tout les caractères de la ligne si le caractère est dans l'alphabet 
            for(int i=0;i<line.length();i++){
            	
            	//si le mot contient 'QU' alors on insert le caractère '&' pour le représenté et on passe a la lettre apres le 'U'
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
	            
        }
        br.close();
        writeFrequence(frequence);
	}
}

package wiktionnary.wiktionnary;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
 
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class App   
    {  
    	public static void main(String[] args)   
    		{
	    		String path = "C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\Wikitionary\\src\\main\\java\\wiktionnary\\wiktionnary\\dico.json";
	   		 
	            JSONObject json = new JSONObject();
	            try {
	            	JSONObject meta = new JSONObject();
					meta.put("description", "definition file");
					meta.put("created_on", "20221014T145610Z");
		            meta.put("language", "fr");
		            json.put("meta", meta);
		            
				} catch (JSONException e1) {
					e1.printStackTrace();
				}
	            
    		try  
    		{ 
	    		//constructor of File class having file as argument  
	    		File file=new File("C:\\Users\\33768\\Downloads\\frwiktionary-20220620-pages-articles-multistream.xml");   
	    		//creates a buffer reader input stream  
	    		@SuppressWarnings("resource")
				BufferedReader br=new BufferedReader(new FileReader(file));  
	    		System.out.println("file content: ");  
	    		String r;  
	    		boolean estMot = false;
	    		int compt1 = 0; // a décommenté pour avoir les 500 1ers lignes
	    		boolean titre = false;
	    		boolean estFrancais = false;  
	    		String mot = "";
	    		String genre="";
	    		JSONArray mots = new JSONArray();//le tableau contenant tout les mots
	    		JSONObject elem = new JSONObject();//L'élément/mot
	    		JSONObject definitions = new JSONObject();//l'objet correspondant à l'ensemble des def associées à un genre
	    		JSONArray arrayDef =  new JSONArray();
	    		while((r = br.readLine()) != null){  
	    			//System.out.println(r);
	    			
	    			//remplacez le mot dans la balise title pour chercher ce mot
	    			if (r.contains("<title>")) {
	    				mot = r.replace("    <title>", "");
	    				mot = mot.replace("</title>", "");
	    				if (mot.length() < 17 && !(mot.contains(" ")) && (!containsUpperCaseLetter(mot)) && (!containsDigit(mot) && (!mot.contains("-")))) {
	                        titre = true;
	                    }
	    			} // 
	    			
	    			//la balise <ns> suivis de 0 signifie que ce contient title est un mot
	    			if(r.contains("<ns>0") && titre) {
	    				estMot = true;
	    			}  
	    			
	    			// la série de if permet de savoir quel est le type du mot
	    			if (estFrancais && r.contains("nom|fr}") || r.contains("nom|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "nom";
	    			}
	    			else if (estFrancais && r.contains("verbe|fr}") || r.contains("verbe|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "verbe";
	    			}
	    			else if (estFrancais && r.contains("article indéfini|fr}") || r.contains("article indéfini|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "article indéfini";
	    			}
	    			else if (estFrancais && r.contains("onomatopée|fr}") || r.contains("onomatopée|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "onomatopée";
	    			}
	    			else if (estFrancais && r.contains("adjectif|fr}") || r.contains("adjectif|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "adjectif";
	    			}
	    			else if (estFrancais && r.contains("symbole|fr}") || r.contains("symbole|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "symbole";
	    			}
	    			else if (estFrancais && r.contains("préposition|fr}") || r.contains("préposition|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "préposition";
	    			}
	    			else if (estFrancais && r.contains("pronom indéfini|fr}") || r.contains("pronom indéfini|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "pronom indéfini";
	    			}
	    			else if (estFrancais && r.contains("interjection|fr}") || r.contains("interjection|fr|")) {
	    				arrayDef = new JSONArray();
	    				genre = "interjection";
	    			} 
	    			

	    			System.out.println(genre);
	    			//vérifie que le mot est français
	    			if(r.contains("== {{langue|fr}} ==") && estMot) {
	    				elem.put("définitions",definitions); 
	    				mots.put(elem);
	    				elem = new JSONObject();//si c'est un nouveau mot on créer un nouvel objet
	    				arrayDef = new JSONArray();
	    				definitions = new JSONObject();
	    				estFrancais = true;
	    				System.out.println(mot);
	    				elem.put("title",mot); 
	    			}
	    			
	    			//permet d'avoir les définitions du mot rechercher
	    			if(estFrancais && r.startsWith("#") && !(r.startsWith("#*")) && !(r.startsWith("##*")) && !(r.startsWith("###*"))) {
	    				arrayDef.put(r);
	    				definitions.put(genre, arrayDef);
	    				System.out.println(r);
	    				//break;  
	    				System.out.println(definitions);
	    			}
	    			
	    			//une fois la lecture des définitions du mot terminée reset les varaibles
	    			if(r.startsWith("  </page>") && estFrancais) {
	    				estMot = false;
	    				titre = false;
	    				estFrancais = false;
	    				
	    			}
	    		// décomentez pour avoir le mot accueil et lire
	    		if (compt1 == 5000)	
	    			break;
	    		else
	    			compt1++;
	    		     		
	    		}
	    		elem.put("définitions",definitions); 
				mots.put(elem);
	    		json.put("mots", mots);
    		}  
    		catch(Exception e)  
    		{  
    		e.printStackTrace();  
    		}  
    		try (PrintWriter out = new PrintWriter(new FileWriter(path))) {
                out.write(json.toString(2));
           } catch (Exception e) {
                e.printStackTrace();
            }

		 
		}
    	
    	public static boolean containsUpperCaseLetter(String s){
            for(int i=0;i<s.length();i++){
                if(Character.isUpperCase(s.charAt(i))){
                    return true;
                }
            }
            return false;
        }
        public static boolean containsDigit(String s){
            for(int i=0;i<s.length();i++){
                if(Character.isDigit(s.charAt(i))){
                    return true;
                }
            }
            return false;
        }
} 


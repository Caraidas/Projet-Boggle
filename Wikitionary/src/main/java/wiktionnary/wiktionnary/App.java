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
	    		String path = "C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\Wikitionary\\src\\main\\java\\wiktionnary\\wiktionnary\\dico.txt";
	   	
	            try {
	            	JSONObject meta = new JSONObject();//ajout des meta-données
					meta.put("description", "definition file");
					meta.put("created_on", "20221014T145610Z");
		            meta.put("language", "fr");
		            try (PrintWriter out = new PrintWriter(new FileWriter(path))) {
		                out.write(meta.toString());
		                out.write("\n");//écriture dans le fichier initialisé précédemment
		                
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
		    	    		boolean estDefFrancais = false;
		    	    		///////////////////Ecriture dans le JSON/////////////////////
		    	    		String mot = "";
		    	    		String genre="";//nom, adjectif, verbe , etc...
		    	    		JSONArray mots = new JSONArray();//le tableau contenant tout les mots
		    	    		JSONObject elem = new JSONObject();//L'élément/mot
		    	    		JSONObject definitions = new JSONObject();//l'objet correspondant à l'ensemble des def associées à un genre
		    	    		JSONArray arrayDef =  new JSONArray();//le tableau des definitions (mot: [def1, def2, def3..]
		    	    		
		    	    		PrintWriter writer = new PrintWriter("C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\Wikitionary\\src\\main\\java\\wiktionnary\\wiktionnary\\index.txt");
		    	    		
		    	    		int start = 0;
		    	    		int end = 0;
		    	    		
		    	    		while((r = br.readLine()) != null){  
		    	    			
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
		    	    			
		    	    			// la série de if permet de savoir quel est le genre du mot
		    	    			if (estFrancais && r.contains("nom|fr}") || r.contains("nom|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "nom";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("verbe|fr}") || r.contains("verbe|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "verbe";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("article indéfini|fr}") || r.contains("article indéfini|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "article indéfini";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("onomatopée|fr}") || r.contains("onomatopée|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "onomatopée";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("adjectif|fr}") || r.contains("adjectif|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "adjectif";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("symbole|fr}") || r.contains("symbole|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "symbole";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("préposition|fr}") || r.contains("préposition|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "préposition";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("pronom indéfini|fr}") || r.contains("pronom indéfini|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "pronom indéfini";
		    	    				estDefFrancais = true;
		    	    			}
		    	    			else if (estFrancais && r.contains("interjection|fr}") || r.contains("interjection|fr|")) {
		    	    				arrayDef = new JSONArray();
		    	    				genre = "interjection";
		    	    				estDefFrancais = true;
		    	    			} 
		    					else if (estFrancais && r.contains("pronom personnel|fr}") || r.contains("pronom personnel|fr|")) {
		    		    				arrayDef = new JSONArray();
		    		    				genre = "pronom personnel";
		    		    				estDefFrancais = true;
		    		    		}
		    					else if(r.startsWith("==")) {
		    						estDefFrancais = false;
		    						genre = "";
		    	    			}
		    	    			
		    	    			//vérifie que le mot est français
		    	    			if(r.contains("== {{langue|fr}} ==") && estMot) {
		    	    				elem.put("définitions",definitions);
		    	    				mots.put(elem);
		    	    				
		    	    				elem = new JSONObject();//si c'est un nouveau mot on réinitialise les variables
		    	    				arrayDef = new JSONArray();
		    	    				definitions = new JSONObject();
		    	    				estFrancais = true;
		    	    				System.out.println(mot);
		    	    				elem.put("title",mot); 
		    	    				writer.write(mot);
		    	    				writer.write("\n");
		    	    			}
		    	    			
		    	    			
		    	    			//permet d'avoir les définitions du mot rechercher
		    	    			if(estFrancais && r.startsWith("#") && !(r.startsWith("#*")) && !(r.startsWith("##*")) && !(r.startsWith("###*")) && estDefFrancais) {
		    	    				r=r.replace("# ", "");
		    	    				r=r.replace("## ", "");
		    	    				r=r.replace("### ", "");
		    	    				r=r.replace("<\\/text>", "");
		    	    				arrayDef.put(r);
		    	    				definitions.put(genre, arrayDef);//le put va ajouter à la clé genre la définition
		    	    				//System.out.println(r);
		    	    				//break;  
		    	    			}
		    	    			
		    	    			//une fois la lecture des définitions du mot terminée reset les varaibles
		    	    			if(r.startsWith("  </page>") && estFrancais) {
		    	    				estMot = false;
		    	    				titre = false;
		    	    				estFrancais = false;
		    	    				elem.put("définitions",definitions); //On ajoute les définitons du dernier élément ajouté
			    		    		out.write(elem.toString());
			    		            out.write("\n");//écriture dans le fichier initialisé précédemment
			    		            byte[] byteArray = elem.toString().getBytes("UTF-8");
			    		            end = byteArray.length;
			    		            writer.write(start);
			    		            writer.write(end);
			    		            start += end+1;
		    	    			}
		    	    			
		    	    			
		    		    		// décomentez pour avoir le mot accueil et lire
		    		    		if (compt1 == 5000)	
		    		    			break;
		    		    		else
		    		    			compt1++;		
		    		    		}	
		    	    		writer.close();
		        		}  
		        		catch(Exception e)  
		        		{  
		        		e.printStackTrace();  
		        		}
		                out.close();
		            } catch (Exception e) {
		                e.printStackTrace();
		            }
		            
				} catch (JSONException e1) {
					e1.printStackTrace();
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


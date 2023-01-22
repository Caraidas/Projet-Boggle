package fr.uge.jdict;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Scanner;
import java.util.TreeMap;
import org.apache.commons.compress.compressors.bzip2.BZip2CompressorInputStream;
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DictionaryMaker {
	public static void main(String[] args) throws IOException{

		String path = args[0]+".txt";//path dico
		FileOutputStream writer = new FileOutputStream(args[0]+".index");//path index
		TreeMap<String,TreeMap<String,Coord>> indexes = new TreeMap<String,TreeMap<String,Coord>>();
		 //Correspond au couple mot normalisé et les mot qui suivent cette normalisation avec leurs coordonnée dans le json EXEMPLE: HashMap = ["CONGRES" : ['congrès' : [0,514] , 'congres' :! 41522147524 ], VERS:['vèrs':52352445, 'vers':412421542245]
	    
		try {
	    	JSONObject meta = new JSONObject();//ajout des meta-données
			meta.put("description", "definition file");
			meta.put("created_on", "20221014T145610Z");
	        meta.put("language", "fr");

	        try (PrintWriter out = new PrintWriter(new OutputStreamWriter(new FileOutputStream(path), StandardCharsets.UTF_8))) {
	            out.write(meta.toString());
	            out.write("\n");//écriture dans le fichier initialisé précédemment
	            
	            try  
		    		{   
	            	/*File file = new File("fichier.xml");
	    			BZip2CompressorInputStream bzIn = new BZip2CompressorInputStream(System.in);
		            FileOutputStream fileOutputStream = new FileOutputStream(file);
		            byte[] buffer = new byte[1024];
		            int len;
		            while ((len = bzIn.read(buffer)) != -1) {
		            	
		                fileOutputStream.write(new String(buffer, StandardCharsets.UTF_8).getBytes());
		            }
		            fileOutputStream.close();
		            bzIn.close();
	            	

	            	InputStream inputStream = System.in;
	            	String result = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
	            	System.out.println(result);
	            	File file = new File(result);*/
	            	
		            BufferedReader br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
		    		String r;  
		    		boolean estMot = false;
		    		int compt1 = 0; // a décommenté pour avoir les 500 1ers lignes
		    		boolean titre = false;
		    		boolean estFrancais = false;  
		    		boolean estDefFrancais = false;
		    		String motNormalise= "";
		    		///////////////////Ecriture dans le JSON/////////////////////
		    		String mot = "";
		    		String genre="";//nom, adjectif, verbe , etc...
		    		JSONArray mots = new JSONArray();//le tableau contenant tout les mots
		    		JSONObject elem = new JSONObject();//L'élément/mot
		    		JSONObject definitions = new JSONObject();//l'objet correspondant à l'ensemble des def associées à un genre
		    		JSONArray arrayDef =  new JSONArray();//le tableau des definitions (mot: [def1, def2, def3..]
		    	
		    		
		    		int start = 0;
		    		int end = 0;
		    		
		    		while((r = br.readLine()) != null){  

		    			//remplacez le mot dans la balise title pour chercher ce mot
		    			if (r.contains("<title>")) {
		    				estMot = false;
		    				mot = r.replace("    <title>", "");
		    				mot = mot.replace("</title>", "");
		    				titre = (mot.length() < 17 && wordCondition(mot));
	
		    			} // 
		    			
		    			//la balise <ns> suivis de 0 signifie que ce contient title est un mot
		    			if(r.contains("<ns>0") && titre) {
		    				estMot = true;
		    			}
		    			
		    			
		    			// la série de if permet de savoir quel est le genre du mot
	                    if (estFrancais && r.contains("S|") &&( r.contains("|fr}") || r.contains("|fr|"))) {
	                        arrayDef = new JSONArray();
	                        genre = r.substring(0,r.indexOf("|fr"));
	                        genre = genre.substring(genre.indexOf("S|")+2);
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
	    		            //String s = new String(byteArray);
	    		            //System.out.println(s);
	    		            end += byteArray.length; 
	    		            
	
		    				if (indexes.get(motNormalise) == null) {
		    					TreeMap<String,Coord> tm = new TreeMap<String,Coord>();
		    					tm.put(mot, new Coord(start, end));
		    					indexes.put(motNormalise, tm);
		    				}
		    				indexes.get(motNormalise).put(mot, new Coord(start, end));
		    				
		    				//writer.write(start);
	    		            //writer.write(end);
		    				
	    		            start = end+1; 
	    		            end = start;
		    			}
		    			
		    			
			    		//décomentez pour avoir le mot accueil et lire
			    		/*if (compt1 == 100000)
			    			break;
			    		else
			    			compt1++;*/
			    		}
		    		
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
		try {
			writeIndex(indexes,writer);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	
		public static boolean wordCondition(String w) {
		for (int i = 0; w.length()>i;i++) {
			if (!Character.isAlphabetic(w.charAt(i)) || Character.isSpaceChar(w.charAt(i)))
				return false;
		}
		return true;
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
		
		public static void writeIndex(TreeMap<String,TreeMap<String,Coord>> indexes,FileOutputStream writer) throws IOException {
		ByteBuffer buffer = ByteBuffer.allocate(8);
		buffer.order(ByteOrder.BIG_ENDIAN);
		
		for(String motNormalise: indexes.keySet()) {
			for(String motNonNormalise : indexes.get(motNormalise).keySet()) {//on itère sur le TreeMap<String, Coord>
				//debut
				int debut = indexes.get(motNormalise).get(motNonNormalise).debut();
				int fin = indexes.get(motNormalise).get(motNonNormalise).fin();
				buffer.putInt(debut);
				buffer.putInt(fin);
				writer.write(buffer.array());  
				buffer.clear();
			}
		}  
		writer.close();
		}
}

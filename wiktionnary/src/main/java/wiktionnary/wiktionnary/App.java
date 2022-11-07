package wiktionnary.wiktionnary;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class App   
    {  
    	public static void main(String[] args)   
    		{
    		try  
    		{  
    		//constructor of File class having file as argument  
    		File file=new File("C:\\Users\\paul_\\OneDrive\\Documents\\Bureau\\frwiktionary-20220601-pages-articles-multistream.xml");   
    		//creates a buffer reader input stream  
    		@SuppressWarnings("resource")
			BufferedReader br=new BufferedReader(new FileReader(file));  
    		System.out.println("file content: ");  
    		String r;  
    		boolean estMot = false;
    		//int compt1 = 0; // a décommenté pour avoir les 500 1ers lignes
    		boolean titre = false;
    		boolean estFrancais = false;
    		String mot = "";
    		while((r = br.readLine()) != null)  
    		{  
    			//System.out.println(r);
    			
    			//remplacez le mot dans la balise title pour chercher ce mot
    			if (r.contains("<title>")) {
    				mot = r.replace("    <title>", "");
    				mot = mot.replace("</title>", "");
    				titre = true;
    			} // 
    			
    			//la balise <ns> suivis de 0 signifie que ce contient title est un mot
    			if(r.contains("<ns>0") && titre) {
    				estMot = true;
    			}
    			
    			//vérifie que le mot est français
    			if(r.contains("== {{langue|fr}} ==") && estMot) {
    				estFrancais = true;
    				System.out.println(mot);
    			}
    			
    			//permet d'avoir la 1er définition du mot rechercher
    			if(estFrancais && r.startsWith("#") && !(r.startsWith("#*")) && !(r.startsWith("##*")) && !(r.startsWith("###*"))) {
    				System.out.println(r);
    				//break;
    			}
    			
    			//une fois la lecture des définitions du mot terminée reset les varaibles
    			if(r.startsWith(" ") && estFrancais) {
    				estMot = false;
    				titre = false;
    				estFrancais = false;
    			}
    				
    		// décomentez pour avoir le mot accueil et lire
    		/*if (compt1 == 500)	
    			break;
    		else
    			compt1++;*/
    		     		
    			}  
    		}  
    		catch(Exception e)  
    		{  
    		e.printStackTrace();  
    		}  
		}
   
}  
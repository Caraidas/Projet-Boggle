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
    		int compt = 0;
    		//int compt1 = 0; 
    		int compt2 = 0;
    		int compt3 = 0;
    		String mot = "";
    		while((r = br.readLine()) != null)  
    		{  
    			//System.out.println(r);
    			
    			//remplacez le mot dans la balise title pour chercher ce mot
    			if (r.contains("<title>")) {
    				mot = r.replace("    <title>", "");
    				mot = mot.replace("</title>", "");
    				compt2 = 1;
    			} // 
    			
    			//la balise <ns> suivis de 0 signifie que ce contient title est un mot
    			if(r.contains("<ns>0") && compt2 == 1) {
    				compt = 1;
    			}
    			
    			if(r.contains("== {{langue|fr}} ==") && compt == 1) {
    				compt3 = 1;
    				System.out.println(mot);
    			}
    			
    			//permet d'avoir la 1er définition du mot rechercher
    			if(compt3 == 1 && r.startsWith("#") && !(r.startsWith("#*")) && !(r.startsWith("##*")) && !(r.startsWith("###*"))) {
    				System.out.println(r);
    				//break;
    			}
    			if(r.startsWith(" ") && compt3 == 1) {
    				compt = 0;
    				compt2 = 0;
    				compt3 = 0;
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
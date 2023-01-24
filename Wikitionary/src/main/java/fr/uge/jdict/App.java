package fr.uge.jdict;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;


    

public class App{  
	public static void main(String[] args) throws IOException{
		File file=new File("C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\definitions.txt"); 
		try(FileInputStream fis = new FileInputStream(file);
	        InputStreamReader isr = new InputStreamReader(fis);
	        BufferedReader reader = new BufferedReader(isr)
		){
			String line;
			/*while((line = reader.readLine()) != null){  
				System.out.println(asYaml(line));
			}*/
			System.out.println(asYaml("{\"définitions\":{\"nom\":[\"''Pluriel de'' [[congre#fr|congre]].\"]},\"title\":\"congres\"}\r\n"
					+ "{\"définitions\":{\"nom\":[\"[[assemblée|Assemblée]] de plusieurs [[représentant]]s de [[différent]]es [[puissance]]s, qui se sont [[rendre|rendus]] dans un même [[lieu]] pour y [[conclure]] la [[paix]] ou pour y [[délibérer]] sur les [[intérêt]]s généraux de divers états.\",\"[[réunion|Réunion]] des [[député]]s et [[sénateur]]s [[français]] en [[parlement]].\",\"[[corps|Corps]] [[législatif]] des [[États-Unis]] d\\u2019[[Amérique]].\",\"Assemblée de plusieurs personnes qui se [[réunir|réunissent]] pour se [[communiquer]] les [[résultat]]s de [[leur]]s [[étude]]s et [[échanger]] [[leur]]s [[idée]]s sur des [[point]]s de [[religion]], de [[science]], de [[littérature]], de [[politique]], etc.\",\"{{lexique|histoire|fr}} [[épreuve|Épreuve]] que devait [[subir]] un [[mari]] que son [[épouse]], [[en vue de]] [[divorce]], [[réputait]] [[impuissant]], afin de [[prouver]] la [[fausseté]] des [[allégation]]s de la [[femme]].\"]},\"title\":\"congrès\"}\r\n"
					+ "{\"définitions\":{\"nom\":[\"{{lexique|diplomatie|fr}} [[assemblée|Assemblée]] de plusieurs [[représentant]]s de [[différent]]es [[puissance]]s, qui se sont [[rendre|rendus]] dans un même [[lieu]] pour y [[conclure]] la [[paix]] ou pour y [[délibérer]] sur les [[intérêt]]s généraux de divers états.\",\"{{lexique|politique|fr}} {{France|fr}} [[réunion|Réunion]] des [[député]]s et [[sénateur]]s [[français]] en [[parlement]].\",\"{{lexique|politique|fr}} {{États-Unis|fr}} [[corps|Corps]] [[législatif]] des [[États-Unis]] d\\u2019[[Amérique]].\"]},\"title\":\"Congrès\"}"));
		}catch (IOException e) {
		  e.printStackTrace();
		}
		
	}
	
	public static String asYaml(String jsonString) throws JsonProcessingException, IOException {
        // parse JSON
        JsonNode jsonNodeTree = new ObjectMapper().readTree(jsonString);
        // save it as YAML
        String jsonAsYaml = new YAMLMapper().writeValueAsString(jsonNodeTree);
        return jsonAsYaml;
    }
} 


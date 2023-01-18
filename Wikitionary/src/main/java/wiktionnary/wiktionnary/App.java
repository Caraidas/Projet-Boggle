package wiktionnary.wiktionnary;
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
		File file=new File("C:\\Users\\33768\\Documents\\GitHub\\Projet-Boggle\\Wikitionary\\src\\main\\java\\wiktionnary\\wiktionnary\\frequences.txt"); 
		try(FileInputStream fis = new FileInputStream(file);
	        InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
	        BufferedReader reader = new BufferedReader(isr)
		){
			String line;
			while((line = reader.readLine()) != null){  
				System.out.println(asYaml(line));
			}
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


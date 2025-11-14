import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class GPT {
    
    private String GPTurl;
    private String apiKey;
    private String GPTmodel;
    
    public GPT()
    {
        GPTurl = "https://api.openai.com/v1/chat/completions";
        apiKey = ""; //API key goes here, Github won't upload with it in
        GPTmodel = "gpt-5.1";
    }
    
    // ----------------------------------------------------------
    /**
     * Creates request string to ask ChatGPT to generate flash cards based on user notes.
     * @param userNotes
     * @param numCards
     * @return AI generated flash cards
     */
    public String generateFlashCards(String userNotes, int numCards)
    {
        String GPTrequest = "Generate " + String.valueOf(numCards) + " flash cards of the most important topics from these notes: " + userNotes;
        return chatGPT(GPTrequest);
    }

    //Connects to Chatgpt using its APIkey, sends request message, and retrieves response
    private String chatGPT(String message) {

        try {
            URL obj = new URL(GPTurl);
            HttpURLConnection connection = (HttpURLConnection) obj.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer " + apiKey);
            connection.setRequestProperty("Content-Type", "application/json");

            String request = "{\"model\": \"" + GPTmodel + "\", \"messages\": [{\"role\": \"user\", \"content\": \"" + message + "\"}]}";
            connection.setDoOutput(true);
            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
            writer.write(request);
            writer.flush();
            writer.close();

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            return extractResponse(response.toString());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String extractResponse(String response) {
        int start = response.indexOf("content")+11; 
        int end = response.indexOf("\"", start);
        return response.substring(start, end); 
    }
    
    
}
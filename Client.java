import java.io.File;
//No AI was used for adding this class

public class Client {
    //~ Fields ................................................................
    private String username;
    private String password;
    private File notes;
    //~ Constructors ..........................................................
    public Client(String name, String pass)
    {
        username = name;
        password = pass;
        notes = null;
    }
    //~Public  Methods ........................................................
    public boolean checkLogin(String name, String pass)
    {
        if(name.equals(username) && password.equals(pass)) {
            return true;
        }
            return false;
    }
    
    public void uploadFile(String path)
    {
        notes = new File(path);
        if (!notes.exists()) {
            throw new IllegalArgumentException("The file does not exist at: " + path);
        }
    }
    
    public File getNotes()
    {
        return notes;
    }

}

import java.io.File;
import java.io.IOException;
import student.TestCase;

public class ClientTest extends TestCase{
    //~ Fields ................................................................
    private Client client1;

    //~Public  Methods ........................................................
    public void setUp() {
        client1 = new Client("username", "password");
    }
    
    public void testCheckLogin() {
        assertTrue(client1.checkLogin("username", "password"));
        assertFalse(client1.checkLogin("user", "password"));
    }
    
    public void testUploadFile( File tempDir) throws IOException {
        // Create a temporary file
        File tempFile = new File(tempDir, "notes.txt");

        client1.uploadFile(tempFile.getAbsolutePath());
        assertTrue(client1.hasNotesFilled());
    }
    
    public void testGetNotes( File tempDir) throws IOException {
        File tempFile = new File(tempDir, "notes.txt");

        client1.uploadFile(tempFile.getAbsolutePath());
        assertNotNull(client1.getNotes());
        assertEquals(tempFile.getAbsolutePath(), client1.getNotes().getAbsolutePath());
    }
    
    public void testNotesFilled( File tempDir) throws IOException {
        File tempFile = new File(tempDir, "notes.txt");
        assertFalse(client1.hasNotesFilled());
        client1.uploadFile(tempFile.getAbsolutePath());
        assertTrue(client1.hasNotesFilled());
    }
    
    public void testGetUser() {
        assertEquals(client1.getUser(), "username");
    }
    
    public void testSetUser() {
        client1.setUser("new name");
        assertEquals(client1.getUser(), "new name");
    }
    
    public void testGetPassword() {
        assertEquals(client1.getPassword(), "password");
    }
    
    public void testSetPassword() {
        client1.setPassword("new password");
        assertEquals(client1.getPassword(), "new password");
    }
}

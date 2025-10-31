import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
    private static final String URL = "jdbc:sqlite:todo.db"; // Nama file database SQLite

    public static Connection connect() {
        try {
            Connection connection = DriverManager.getConnection(URL);
            return connection;
        } catch (SQLException e) {
            System.out.println("Connection to SQLite failed: " + e.getMessage());
            return null;
        }
    }
}

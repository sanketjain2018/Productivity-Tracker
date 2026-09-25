package in.sj.exception;

@SuppressWarnings("serial")
public class DuplicateUserException extends RuntimeException {

    public DuplicateUserException(String message) {
        super(message);
    }
}
package ch.mgmt.messages;


public class MessageLogin {
	
	public String userEmail;
	public String userPassword;
	
	public MessageLogin() {
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	
}

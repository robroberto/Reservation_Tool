package ch.mgmt.service_account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ch.mgmt.business.VerificationClass;
import ch.mgmt.logger.LoggerClass;
import ch.mgmt.messages.MessageNewAccountRequest;
import ch.mgmt.persistence.AccountRequest;
import ch.mgmt.persistence.AccountRequestRepository;


@RestController
public class AccountRequestCrudService {
	
	@Autowired
	private AccountRequestRepository accountRepository;
	
	@Autowired
	private VerificationClass verificationClass;
	
	LoggerClass logger = new LoggerClass();
	
	@PostMapping(path = "/api/article/account_request", produces = "application/json")
	public AccountRequest createAccountRequest(@RequestBody MessageNewAccountRequest m) {
		
		AccountRequest a = new AccountRequest();

		a.setAccountRequestEmail(m.getAccountRequestEmail());
		a.setAccountRequestMobile(m.getAccountRequestMobile());
		a.setAccountRequestName(m.getAccountRequestName());
		a.setAccountRequestPassword(m.getAccountRequestPassword());
		if (verificationClass.validateAccountRequest(a)) {
			accountRepository.save(a);
			logger.getLogger().info(this.getClass().getName() + "||AccountRequest created||");
			return a;
		} else {
			logger.getLogger().info(this.getClass().getName() + "||AccountRequest failed||");
			return null;
		}
	}
}

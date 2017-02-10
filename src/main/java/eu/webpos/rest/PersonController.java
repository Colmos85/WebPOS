package eu.webpos.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import eu.webpos.entity.Person;
import eu.webpos.service.IPersonService;

@RestController
@RequestMapping("/data")
public class PersonController {
	@Autowired
	private IPersonService personService;
	@RequestMapping("/person")
	public Person getPersonDetail(@RequestParam(value = "id",required = false,
	                                                    defaultValue = "0") Integer id) {
		Person p = personService.getPersonDetail(id);
		return p;
	}
} 

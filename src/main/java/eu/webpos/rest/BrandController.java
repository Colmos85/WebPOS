package eu.webpos.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import eu.webpos.entity.Brand;
import eu.webpos.service.BrandRepo;

@RestController
@RequestMapping("/brands")
public class BrandController {
	
	@Autowired
	private BrandRepo rp;
	
	/**
	 * Web service for getting all the Stock. with array of products & stores
	 * 
	 * @return list of all Stock
	 */
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Brand> findAll() {
		return rp.findAll();
	}

}



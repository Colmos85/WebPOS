package eu.webpos.rest;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import eu.webpos.entity.Brand;
import eu.webpos.service.BrandRepo;

@RestController
@RequestMapping("/brands")
public class BrandController {
	
	public static final Logger logger = LoggerFactory.getLogger(BrandController.class);
	
	@Autowired
	private BrandRepo rp;
	
	/**
	 * Web service for getting all the Brands
	 * 
	 * @return list of all Brands
	 */
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Brand> findAll() {
		return rp.findAll();
	}
	
	/**
	 * 
	 * @param brand
	 * @return - SHOULD RETURN id generated from the database
	 */
	@RequestMapping(value = "/", method = RequestMethod.POST)
    public Brand createUser(@RequestBody Brand brand) {
		Brand createdBrand = rp.save(brand);
		//rp.flush();
		System.out.println("Returned id:" + createdBrand.getId());
        return createdBrand;
	}

	
	
/*    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> createBrand(@RequestBody Brand brand, UriComponentsBuilder ucBuilder) {
        logger.info("Creating User : {}", brand);
 
        if (rp.isBrandExist(brand)) {
            //logger.error("Unable to create. A Brand with name {} already exist", brand.getBrandName());
            return new ResponseEntity(new CustomErrorType("Unable to create. A Brand with name " + 
            brand.getBrandName() + " already exist."),HttpStatus.CONFLICT);
        }
        rp.save(brand);
 
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/brand/{id}").buildAndExpand(brand.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }*/

}



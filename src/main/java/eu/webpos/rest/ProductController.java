package eu.webpos.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import eu.webpos.entity.Brand;
import eu.webpos.entity.Product;
import eu.webpos.entity.Stock;
import eu.webpos.rest.BrandController.CustomErrorType;
import eu.webpos.service.ProductRepo;
import eu.webpos.service.StockRepo;

//@CrossOrigin(origins = "http://localhost:8000")
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductRepo rp;
	
	@Autowired
	private StockRepo stockrp;
	
	/**
	 * Web service for getting all the Products in the application.
	 * 
	 * @return list of all Products
	 */
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Product> findAll() {
		return rp.findAll();
	}
	
	@GetMapping("/{id}")
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@ResponseBody
	public Product findone(@PathVariable("id") int id)
	{
		return rp.findById(id);
	};
	
	//@GetMapping("/delete/{id}")
	@DeleteMapping("/{id}")
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@ResponseBody
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id)
	{
		System.out.println("Remove product with this id: " + id);
		//int theid = id.intValue(); // must chnage this to support Long
		Product p = rp.findById(id);
		rp.delete(p);
		return new ResponseEntity(new CustomErrorType("Deleted successfully."),HttpStatus.ACCEPTED);
	};
	
	
	/**
	 * Method to check if a Product already exists by checking barcode
	 * @param brand
	 * @return boolean value
	 */
	@RequestMapping(value = "/exists/{barcode}", method = RequestMethod.GET)
	public boolean productExists(@PathVariable String barcode) {
		boolean exists = false;
		if(rp.countByBarcode(barcode) > 0){
			exists = true;
		}
		return exists;
	}
	
	
	
	/**
	 * Post a new brand to the database
	 * 
	 * @param brand
	 * @param ucBuilder
	 * @return
	 */
	@RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> createProduct(@RequestBody Product product, UriComponentsBuilder ucBuilder) {
        //logger.info("Creating Brand : {}", brand);
		Product createdProduct = null;
        if (rp.countByBarcode(product.getBarcode()) > 0) {
            return new ResponseEntity(new CustomErrorType("Unable to create. This Product barcode already exist."),HttpStatus.CONFLICT);
        }
        createdProduct = rp.save(product);
        
        // create stock 
        for(Stock stock : product.getStock())
        {
        	stock.setProduct(createdProduct);
        	Stock s = stockrp.save(stock);
        	System.out.println("stock id" + s.getId());
        	stock.setId(s.getId());
        }
        // set the stock (including ids) to the created product so it can be returned
        createdProduct.setStock(product.getStock());
        
        return new ResponseEntity<Product>(createdProduct, HttpStatus.CREATED);
    }
	
	
	 /**
     * Inner class
     * 
     * @author Colmos
     *
     */
    public class CustomErrorType {
    	 
        private String errorMessage;
     
        public CustomErrorType(String errorMessage){
            this.errorMessage = errorMessage;
        }
     
        public String getErrorMessage() {
            return errorMessage;
        }
     
    }
	

}

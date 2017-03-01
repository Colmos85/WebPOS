package eu.webpos.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eu.webpos.entity.Brand;
import eu.webpos.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{

	//public List<Product> findAll(int id);
	public Product findById(int id);
	
	public int countByBarcode(String barcode);
	public Product findByBarcode(String barcode);
	
/*	public List<Product> findAllProductDetails(){
		return @Query("select * from A, AB"
				+ " where A.id = AB.a_id "
				+ "group by a_id "
				+ "order by count(*) desc", Product.class).getResultList();
	}*/
}

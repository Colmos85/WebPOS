package eu.webpos.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eu.webpos.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{

	//List<Product> findById(int id);
	Product findById(int id);
}

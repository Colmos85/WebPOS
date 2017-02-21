package eu.webpos.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Stock {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;	
	
	private int quantity;
	
	
	@ManyToOne
    @JoinColumn(name = "store_id")
	private Store store;
	
	@ManyToOne
    @JoinColumn(name = "product_id")
	private Product product;



	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	
	
	
}

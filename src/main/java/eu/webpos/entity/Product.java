package eu.webpos.entity;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;	
	
	private String barcode1;
	private String description;
	private double tradePriceEx;
	private double markup;
	private double retailPriceEx;
	private double retailPriceInc;
	
	@OneToOne // should be ManyToOne
	@JoinColumn(name = "tax_band_id")
	private TaxBand taxBand; //BigDecimal taxBand;
	
	@OneToOne
    @JoinColumn(name = "brand_id")
	private Brand brand;
	
	@OneToMany(mappedBy = "product")
	@JsonManagedReference
	private List<Stock> stock;
	
	
	public Product(int id, String barcode1, String description, double tradePriceEx, double markup) {
		super();
		this.id = id;
		this.barcode1 = barcode1;
		this.description = description;
		this.tradePriceEx = tradePriceEx;
		this.markup = markup;
	}
	
	public Product()
	{
		super();
	}
	


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBarcode() {
		return barcode1;
	}

	public void setBarcode(String barcode1) {
		this.barcode1 = barcode1;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getTradePriceEx() {
		return tradePriceEx;
	}

	public void setTradePriceEx(double tradePriceEx) {
		this.tradePriceEx = tradePriceEx;
	}

	public double getMarkup() {
		return markup;
	}

	public void setMarkup(double markup) {
		this.markup = markup;
	}

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public List<Stock> getStock() {
		return stock;
	}

	public void setStock(List<Stock> stock) {
		this.stock = stock;
	}

	public double getRetailPriceEx() {
		return retailPriceEx;
	}

	public void setRetailPriceEx(double retailPriceEx) {
		this.retailPriceEx = retailPriceEx;
	}

	public double getRetailPriceInc() {
		return retailPriceInc;
	}

	public void setRetailPriceInc(double retailPriceInc) {
		this.retailPriceInc = retailPriceInc;
	}

	public TaxBand getTaxBand() {
		return taxBand;
	}

	public void setTaxBand(TaxBand taxBand) {
		this.taxBand = taxBand;
	}
	
	
	
	
}

package com.salmik.productservice.service;

import com.salmik.productservice.entity.Product;
import com.salmik.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public List<Product> getActiveProducts() {
        return productRepository.findByIsActiveTrue();
    }
    
    public List<Product> getLowStockProducts(Integer threshold) {
        return productRepository.findByStockLessThan(threshold);
    }
    
    public Product createProduct(Product product) {
        product.setIsActive(true);
        return productRepository.save(product);
    }
    
    public Product updateProduct(Long id, Product product) {
        Optional<Product> existing = productRepository.findById(id);
        if (existing.isPresent()) {
            Product p = existing.get();
            p.setName(product.getName());
            p.setDescription(product.getDescription());
            p.setPrice(product.getPrice());
            p.setMrp(product.getMrp());
            p.setCategory(product.getCategory());
            p.setStock(product.getStock());
            p.setRating(product.getRating());
            p.setImage(product.getImage());
            p.setThumbnail(product.getThumbnail());
            return productRepository.save(p);
        }
        return null;
    }
    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

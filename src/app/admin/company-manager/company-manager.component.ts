import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {AdminService} from '../admin.service';
import {CategoryModel, ProductCompany} from '../../shared/Product.model';
import {first} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-company-manager',
  templateUrl: './company-manager.component.html',
  styleUrls: ['./company-manager.component.css']
})
export class CompanyManagerComponent implements OnInit {
  companies: ProductCompany[] = [];
  success: boolean;
  banner = '';
  discount: number;
  submitted = false;
  selectedCompany: ProductCompany;
  constructor(private sharedService: SharedService, private adminService: AdminService, private titleService: Title) {
    this.titleService.setTitle('NetMeds | Brand Management');
  }

  ngOnInit(): void {
    this.sharedService.getAllCompanies().pipe(first()).subscribe((value: ProductCompany[]) => {
      this.companies = value;
    });
  }

  updateSelectedCompany(c: ProductCompany): void {
    this.selectedCompany = c;
    this.discount = c.discount;
  }
  updateDiscount(): void {
    if (this.discount >= 0 && this.discount <= 100) {
      this.submitted = true;
      this.adminService.updateCompanyDiscount(this.selectedCompany.id, this.discount)
        .pipe(first()).subscribe((value: ProductCompany) => {
          if (value) {
            this.success = true;
            this.banner = 'Company Discount has been updated successfully';
            this.submitted = false;
            const index = this.companies.findIndex(v => v.id === value.id);
            if (index > -1) {
              this.companies[index] = value;
            }
          }
      }, error => {
        this.banner = 'Company Discount could not be updated';
        this.success = false;
        this.submitted = false;
      });
    }
  }
}

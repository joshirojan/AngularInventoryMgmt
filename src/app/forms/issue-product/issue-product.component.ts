import { Component, OnInit, inject } from '@angular/core';
import { issueProductModel } from 'src/app/Models/issueProductModel';
import { IssueProductService } from 'src/app/Services/issue-product.service';

@Component({
  selector: 'app-issue-product',
  templateUrl: './issue-product.component.html',
  styleUrls: ['./issue-product.component.scss']
})
export class IssueProductComponent implements OnInit{
  issueProducts: issueProductModel[] = [];
  readonly issueProductService = inject(IssueProductService);

  ngOnInit(): void {
    this.issueProductService.fetchIssueProduct();
  }
}

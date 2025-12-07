import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseHttpService {
  allBrands!: allBrands[];

  getAllBrands() {
    return this.http.get<IGetAllBrandsResponse>(APP_APIS.BRANDS.allBrands).subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
    });
  }
}

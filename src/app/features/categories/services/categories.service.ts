import { Injectable } from '@angular/core';
import { APP_APIS } from '../../../core/constants/app-apis';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseHttpService {
  allCategories!: ICategory[];

  getAllCategories(): void {
    this.http
      .get<IAllCategoriesResponse>(APP_APIS.CATEGORIES.allCategories)
      .subscribe((response) => {
        this.allCategories = response.data;
      });
  }
}

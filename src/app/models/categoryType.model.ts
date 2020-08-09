interface ICategoryTypes {
  id: string;
  value: string;
}
export class CategoryType {
  private selectedCategoryType: string;

  private categoryTypes: ICategoryTypes[] = [
    { id: 'establishment', value: 'Establishment' },
    { id: 'geocode', value: 'Geocode' },
    { id: 'lodging', value: 'Hotels/Appartments' },
    { id: 'aquarium', value: 'Aquariums' },
  ];

  getCategoryTypes() {
    return this.categoryTypes;
  }

  getSelectedCategoryType() {
    return this.selectedCategoryType;
  }

  setSelectedCategoryType(type) {
    this.selectedCategoryType = type;
  }
}

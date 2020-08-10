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

  //getters
  getCategoryTypes() {
    return this.categoryTypes;
  }

  getSelectedCategoryType() {
    return this.selectedCategoryType;
  }

  //setters
  setSelectedCategoryType(type) {
    this.selectedCategoryType = type;
  }
}

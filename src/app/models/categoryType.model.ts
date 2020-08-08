export class CategoryType {
  private selectedCategoryType: string;

  getSelectedCategoryType() {
    return this.selectedCategoryType;
  }

  setSelectedCategoryType(type) {
    this.selectedCategoryType = type;
  }
}

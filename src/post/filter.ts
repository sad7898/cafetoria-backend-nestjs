import { FilterQuery } from 'mongoose';

export class FilterBuilder<T> {
  private filter: FilterQuery<T> = { $and: [] };
  getFilter() {
    if (this.filter.$and.length === 0) return {} as FilterQuery<T>;
    return this.filter;
  }
  addTextSearch(text: string) {
    if (text) {
      const f = {
        $text: { $search: text },
      };
      this.filter.$and.push(f);
    }

    return this;
  }
  addMatchAll(key: keyof T, matches?: any[]) {
    if (matches && matches.length !== 0 && key) {
      const f = {
        [key]: { $all: matches },
      };
      this.filter.$and.push(f as { [P in keyof T]: any });
    }
    return this;
  }
  addMatchField(key: keyof T, match?: any) {
    if (match) {
      this.filter.$and.push({ key: match });
    }
    return this;
  }
}

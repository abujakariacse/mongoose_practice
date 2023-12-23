import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields: string[] = [
      'search',
      'sort',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.filter((ele) => delete queryObj[ele]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  pagination() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 1;
    const skip: number = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip);
    return this;
  }

  limit() {
    const limit = this?.query?.limit || 0;
    this.modelQuery = this.modelQuery.limit(limit as number);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

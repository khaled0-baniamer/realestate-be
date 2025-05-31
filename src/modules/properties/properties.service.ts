import { Inject, Injectable } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { Op } from 'sequelize';
import { CreatePropertyDto, FilterPropertyDto, UpdatePropertyDto } from './dto';

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('PROPERTIES_REPOSITORY')
    private readonly propertiesModel: typeof Property,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = await this.propertiesModel.create({
      ...createPropertyDto,
    });
    return property;
  }

  async findAll(
    filters: FilterPropertyDto,
  ): Promise<{ data: Property[]; page: number; size: number }> {
    const {
      areaFrom,
      areaTo,
      bathroomId,
      bedroomId,
      cityId,
      countryId,
      districtId,
      furnishedId,
      priceFrom,
      priceTo,
      typeId,
      page = 1,
      size = 6,
      purpose,
    } = filters;

    console.log('🚀 ~ PropertiesService ~ page:', page);
    const whereObj: any = {};

    if (countryId) whereObj.countryId = countryId;
    if (cityId) whereObj.cityId = cityId;

    if (bathroomId?.length) whereObj.bathroomId = { [Op.in]: bathroomId };
    if (bedroomId?.length) whereObj.bedroomId = { [Op.in]: bedroomId };
    if (districtId?.length) whereObj.districtId = { [Op.in]: districtId };
    if (typeId?.length) whereObj.typeId = { [Op.in]: typeId };
    if (furnishedId?.length) whereObj.furnishedId = { [Op.in]: furnishedId };
    if (purpose) whereObj.purpose = { [Op.eq]: purpose };

    if (areaFrom !== undefined || areaTo !== undefined) {
      whereObj.area = {};
      if (areaFrom !== undefined) whereObj.area[Op.gte] = areaFrom;
      if (areaTo !== undefined) whereObj.area[Op.lte] = areaTo;
    }

    if (priceFrom !== undefined || priceTo !== undefined) {
      whereObj.price = {};
      if (priceFrom !== undefined) whereObj.price[Op.gte] = priceFrom;
      if (priceTo !== undefined) whereObj.price[Op.lte] = priceTo;
    }

    const limit = Number(size);
    const offset = (Number(page) - 1) * Number(size);

    const properties = await this.propertiesModel.findAll<Property>({
      where: whereObj,
      limit,
      offset,
      include: { all: true },
    });

    return { data: properties, page: Number(page), size: Number(size) };
  }

  async findOne(id: number): Promise<Property> {
    const property = await this.propertiesModel.findByPk<Property>(id, {
      include: { all: true },
    });
    if (!property) {
      throw new Error(`Property with ID ${id} not found`);
    }
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.propertiesModel.findByPk<Property>(id);
    if (!property) {
      throw new Error(`Property with ID ${id} not found`);
    }

    await property.update(updatePropertyDto);
    return property;
  }

  async remove(id: number): Promise<{ message: string }> {
    const property = await this.propertiesModel.findByPk<Property>(id);
    if (!property) {
      throw new Error(`Property with ID ${id} not found`);
    }

    await property.destroy();
    return { message: `Property with ID ${id} removed successfully` };
  }

  async similarProperty(id: number): Promise<Property[]> {
    const property = await this.propertiesModel.findByPk<Property>(id);

    if (!property) {
      throw new Error(`Property with ID ${id} not found`);
    }

    const similarityCriteria: any = {
      typeId: property.typeId,
      bedroomId: property.bedroomId,
      bathroomId: property.bathroomId,
    };

    const areaRange = {
      [Op.between]: [property.area * 0.8, property.area * 1.2], // 20% range
    };
    const priceRange = {
      [Op.between]: [property.price * 0.8, property.price * 1.2], // 20% range
    };

    const similarProperties = await this.propertiesModel.findAll<Property>({
      where: {
        ...similarityCriteria,
        area: areaRange,
        price: priceRange,
        id: { [Op.ne]: property.id },
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: { all: true },
    });

    if (similarProperties.length < 6) {
      const additionalProperties = await this.propertiesModel.findAll<Property>(
        {
          where: {
            typeId: property.typeId,
            id: { [Op.ne]: property.id },
          },
          limit: 10 - similarProperties.length,
          order: [['createdAt', 'DESC']],
          include: { all: true },
        },
      );

      return [...similarProperties, ...additionalProperties].slice(0, 10);
    }

    return similarProperties.slice(0, 10);
  }
}

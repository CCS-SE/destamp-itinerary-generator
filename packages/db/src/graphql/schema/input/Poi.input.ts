import { inputObjectType } from 'nexus';

export const CreatePoiInput = inputObjectType({
  name: 'CreatePoiInput',
  definition(t) {
    t.string('name');
    t.string('address');
    t.nullable.string('description');
    t.string('contactNumber');
    t.string('price');
    t.float('latitude');
    t.float('longitude');
    t.int('visitDuration');
    t.boolean('isAttraction');
    t.string('permitUrl');
    t.list.field('operatingHours', { type: 'OperatingHoursInput' });
    t.list.string('categories');
    t.list.string('imageUrls');
    t.nullable.list.string('atmospheres');
    t.nullable.list.string('amenities');
  },
});

export const OperatingHoursInput = inputObjectType({
  name: 'OperatingHoursInput',
  definition(t) {
    t.int('day');
    t.nullable.field('openTime', { type: 'DateTime' });
    t.nullable.field('closeTime', { type: 'DateTime' });
    t.boolean('isClosed');
    t.boolean('is24hours');
  },
});

export const EditPoiInput = inputObjectType({
  name: 'EditPoiInput',
  definition(t) {
    t.nullable.string('name');
    t.nullable.string('address');
    t.nullable.string('description');
    t.nullable.string('contactNumber');
    t.nullable.string('price');
    t.nullable.float('latitude');
    t.nullable.float('longitude');
    t.nullable.int('visitDuration');
    t.nullable.list.field('operatingHours', { type: 'OperatingHoursInput' });
    t.nullable.list.string('categories');
    t.nullable.list.string('imageUrls');
    t.nullable.list.string('atmospheres');
    t.nullable.list.string('amenities');
  },
});

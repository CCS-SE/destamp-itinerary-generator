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

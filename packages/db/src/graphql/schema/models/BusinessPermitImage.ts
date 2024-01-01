import { objectType } from 'nexus';

const BusinessPermitImage = objectType({
  name: 'BusinessPermitImage',
  definition(t) {
    t.string('id');
    t.string('userId');
    t.string('imageId');
    t.string('poiId');
  },
});

export default BusinessPermitImage;

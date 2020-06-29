import { configService } from './config-service';
import fs = require('fs');

const filename = 'ormconfig.json';

try {
  fs.unlinkSync(filename);
} catch (e) {
  console.log(`${filename} not found.`);
}

fs.writeFileSync(
  filename,
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);

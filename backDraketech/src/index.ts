import app from './app'
import './database'

// Server listen
app.listen(app.get('port'))
console.log('Server on port', app.get('port'));

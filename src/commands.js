import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('new <note>', 'create a new note ', (yargs) => {
    return yargs.positional('note',{
        type:"String",
        discription:"The content of note to be created "

    })
  }, (argv) => {
    console.log(argv.note)
  })
  .options('tags',{
    alias:'t',
    type:'Sting',
    discripton:'tags to add a new note'
  })
  .demandCommand(1)
  .parse()
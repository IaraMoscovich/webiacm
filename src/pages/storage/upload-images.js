import {
    Uppy
  } from "@uppy/core"

import Dashboard from "@uppy/dashboard"
process.env.BEARER_TOKEN
process.env.STORAGE_BUCKET
process.env.SUPABASE_ANON_KEY

const folder = ""
const supabaseStorageUrl = "https://afwgthjhqrgxizqydmvs.supabase.co/storage/v1/s3"

var uppy = new Uppy()
        .use(Dashboard, {
          inline: true,
          limit: 10,
          target: '#drag-drop-area',
          showProgressDetails: true,
        })
        .use(Tus, {
          endpoint: supabaseStorageURL,
          headers: {
            authorization: `Bearer ${BEARER_TOKEN}`,
            apikey: SUPABASE_ANON_KEY,
          },
          uploadDataDuringCreation: true,
          chunkSize: 6 * 1024 * 1024,
          allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
          onError: function (error) {
            console.log('Failed because: ' + error)
          },
        })

      uppy.on('file-added', (file) => {
        const supabaseMetadata = {
          bucketName: STORAGE_BUCKET,
          objectName: folder ? `${folder}/${file.name}` : file.name,
          contentType: file.type,
        }

        file.meta = {
          ...file.meta,
          ...supabaseMetadata,
        }

        console.log('file added', file)
      })

      uppy.on('complete', (result) => {
        console.log('Upload complete! We’ve uploaded these files:', result.successful)
      })

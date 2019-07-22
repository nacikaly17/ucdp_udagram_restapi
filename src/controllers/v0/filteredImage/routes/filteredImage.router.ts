import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../../../..//util/util';

const router: Router = Router();


// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */
// Filterimage Endpoint
// Returns an image filtered , which is defined in "image_url"
router.get('/',
    async (req: Request, res: Response) => {
        let { image_url } = req.query;
        //    1. validate the image_url query
        if (!image_url) {
            return res.status(400).send({ message: 'image_url is required to filter' });
        }
        try {
            //    2. call filterImageFromURL(image_url) to filter the image
            await (filterImageFromURL(image_url)).then(function (filteredImageData) {
                //    3. send the resulting file in the response
                res.status(200).sendFile(filteredImageData, () =>
                    //  4. deletes any files on the server on finish of the response
                    deleteLocalFiles([filteredImageData]));
            })

        }
        catch (err) {
            res.status(400).send('Image could not filtered with the function "filteredImageFromURL"');
        }
    });
//! END @TODO1


export const FilteredImageRouter: Router = router;
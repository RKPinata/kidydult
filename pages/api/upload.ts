import type { NextApiRequest, NextApiResponse } from 'next';

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  const { files } = req;

  // You can perform further processing or handle the files here
  // For example, you can save the files to disk, process their content, etc.

  // Send a response back to the client
  res.status(200).json({ message: 'Files uploaded successfully.' });
};

export default uploadFiles;

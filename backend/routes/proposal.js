import express from "express";
import { getProposal,getProposalArsip,getProposalbyId,getProposalView ,createProposal, updateProposal, deleteProposal, deleteMultiple, setStatus, updateKeteranganWd3, updateKeteranganKeuangan, updateRevisi, updateArsip } from "../controllers/Proposal.js";
import { ExportToExcel } from "../controllers/Export.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const Proposalroute = express.Router();

Proposalroute.get('/proposal', verifyUser, getProposal);
Proposalroute.get('/arsip', verifyUser, getProposalArsip);
Proposalroute.get('/proposal/:uuid', verifyUser, getProposalbyId);
Proposalroute.get('/pengumuman', getProposalView);
Proposalroute.get('/export', ExportToExcel);
Proposalroute.post('/proposal', verifyUser, createProposal);
Proposalroute.patch('/proposal/:id', verifyUser, updateProposal);
Proposalroute.patch('/setstatus/:id', verifyUser, setStatus);
Proposalroute.patch('/updateketeranganwd3/:id', verifyUser, updateKeteranganWd3);
Proposalroute.patch('/updatearsip/:id', updateArsip);
Proposalroute.patch('/updaterevisi/:id', verifyUser, updateRevisi);
Proposalroute.patch('/updatekeuangan/:id', verifyUser, updateKeteranganKeuangan);
Proposalroute.delete('/proposal/:id', verifyUser, deleteProposal);
Proposalroute.delete('/proposal/', verifyUser, deleteMultiple);

export default Proposalroute;

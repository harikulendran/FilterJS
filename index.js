import Jimp from 'jimp';
import { filters } from './Filters';
import { functions, convolutions } from './ImageFunctions';

class FilterJS {
	getBufferFrom64 (base64) {
		return Buffer.from( base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
	}

	async processInstruction(image, instr) {
		if (instr.apply in functions)
			return image.scan(0,0,image.bitmap.width,image.bitmap.height, functions[instr.apply](...instr.params,image.bitmap.width,image.bitmap.height));
		if (instr.apply in convolutions)
			return image.convolute(convolutions[instr.apply](...instr.params));

		var params = instr.params.length===0 ? 
			[] :
			instr.apply === "color" ?
				instr.params :
				instr.params[0];
		return (params.length === 0) ?
			image[instr.apply]() :
			image[instr.apply](params);
	}

	async apply(input, filter) {
		var layers = [];
		var image = await Jimp.read(this.getBufferFrom64(input));
		var layersInstr = (filter.name in filters) ? filters[filter.name] : filter.instructions;
		for (var ldx in layersInstr) {
			var clay = layersInstr[ldx];
			if (clay.layer==="base" && layers[clay.idx]===undefined)
				layers[clay.idx] = { image:image, mode:clay.blend };
			else if (clay.layer==="clone")
				layers[clay.idx] = {image:layers[clay.cl].image.clone(), mode:clay.blend };
			else if (clay.layer==="blank")
				layers[clay.idx] = {image:await new Jimp(image.bitmap.width,image.bitmap.height), mode:clay.blend };
			for (var idx in clay.instructions)
				layers[clay.idx].image = await this.processInstruction(layers[clay.idx].image, clay.instructions[idx]);
			if (clay.idx > 0)
				layers[0].image.composite(layers[clay.idx].image, 0,0, {mode:clay.blend});
		}

		return layers[0].image.getBase64Async("image/png");
	}

}
export default FilterJS;

/*
 * Jimp, Copyright (c) 2018 Oliver Moran
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * CamanJS, Copyright (c) 2010-2016, Ryan LeFevre
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this list
 * of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice, this
 * list of conditions and the following disclaimer in the documentation and/or other
 * materials provided with the distribution.
 * * Neither the name of Ryan LeFevre nor the names of its contributors may be used
 * to endorse or promote products derived from this software without specific prior
 * written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 * OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */


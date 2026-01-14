
import re

file_path = 'data/doctrina.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
buffer = []
in_object = False
skip_object = False

for line in lines:
    stripped = line.strip()
    
    # Start of an object in the array
    if stripped == '{':
        in_object = True
        buffer = [line]
        skip_object = False
        continue
    
    # End of an object
    if in_object and stripped in ['},', '}']:
        buffer.append(line)
        if not skip_object:
            # Process buffer to remove bookId and codi lines if we interpret them as "to be removed"
            # But wait, if we keep the object, we should probably keep the properties unless they cause errors.
            # The interface removed them, so we SHOULD remove them.
            clean_buffer = []
            for bline in buffer:
                if "bookId:" in bline:
                    continue
                if "codi:" in bline and "'civil'" in bline:
                    # this should have been skipped already by skip_object logic below, but just in case
                    continue
                if "codi:" in bline:
                    # Remove codi line as it is removed from interface
                    continue
                clean_buffer.append(bline)
            new_lines.extend(clean_buffer)
        
        in_object = False
        buffer = []
        continue

    if in_object:
        buffer.append(line)
        # Check for bad patterns
        if "codi: 'civil'" in line or 'codi: "civil"' in line:
            skip_object = True
        if "bookId:" in line:
            skip_object = True
    else:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Cleaned data/doctrina.ts")

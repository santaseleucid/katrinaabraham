#!/usr/bin/env python3
"""
Image Resizer for Web
Resizes high-resolution images to web-suitable dimensions while maintaining aspect ratios.
"""

import os
import sys
from PIL import Image, ImageOps
import argparse
from pathlib import Path

def resize_image_for_web(input_path, output_path, max_width=1920, max_height=1080, quality=85):
    """
    Resize an image for web use while maintaining aspect ratio.
    
    Args:
        input_path (str): Path to input image
        output_path (str): Path to save resized image
        max_width (int): Maximum width in pixels
        max_height (int): Maximum height in pixels
        quality (int): JPEG quality (1-100, higher is better)
    
    Returns:
        tuple: (original_size, new_size, file_size_reduction)
    """
    try:
        # Open and auto-rotate image based on EXIF data
        with Image.open(input_path) as img:
            img = ImageOps.exif_transpose(img)
            original_size = img.size
            
            # Calculate new dimensions while maintaining aspect ratio
            img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
            new_size = img.size
            
            # Convert RGBA to RGB if saving as JPEG
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Save with optimization
            save_kwargs = {'optimize': True}
            if output_path.lower().endswith(('.jpg', '.jpeg')):
                save_kwargs['quality'] = quality
                save_kwargs['format'] = 'JPEG'
            elif output_path.lower().endswith('.png'):
                save_kwargs['format'] = 'PNG'
            elif output_path.lower().endswith('.webp'):
                save_kwargs['quality'] = quality
                save_kwargs['format'] = 'WEBP'
            
            img.save(output_path, **save_kwargs)
            
            # Calculate file size reduction
            original_file_size = os.path.getsize(input_path)
            new_file_size = os.path.getsize(output_path)
            size_reduction = ((original_file_size - new_file_size) / original_file_size) * 100
            
            return original_size, new_size, size_reduction
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return None, None, None

def process_images(input_dir, output_dir=None, max_width=1920, max_height=1080, 
                  quality=85, suffix="_web", supported_formats=None):
    """
    Process multiple images in a directory.
    
    Args:
        input_dir (str): Directory containing input images
        output_dir (str): Output directory (None to use input_dir)
        max_width (int): Maximum width in pixels
        max_height (int): Maximum height in pixels
        quality (int): JPEG quality (1-100)
        suffix (str): Suffix to add to output filenames
        supported_formats (list): List of supported file extensions
    """
    if supported_formats is None:
        supported_formats = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp']
    
    input_path = Path(input_dir)
    if not input_path.exists():
        print(f"Error: Input directory '{input_dir}' does not exist.")
        return
    
    # Set output directory
    if output_dir is None:
        output_path = input_path
    else:
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
    
    # Find all image files
    image_files = []
    for ext in supported_formats:
        image_files.extend(input_path.glob(f"*{ext}"))
        image_files.extend(input_path.glob(f"*{ext.upper()}"))
    
    if not image_files:
        print(f"No supported image files found in '{input_dir}'")
        print(f"Supported formats: {', '.join(supported_formats)}")
        return
    
    print(f"Found {len(image_files)} images to process...")
    print(f"Max dimensions: {max_width}x{max_height}")
    print(f"Quality: {quality}")
    print("-" * 50)
    
    total_original_size = 0
    total_new_size = 0
    successful_conversions = 0
    
    for img_file in image_files:
        # Generate output filename
        stem = img_file.stem
        ext = img_file.suffix.lower()
        
        # Convert to web-friendly format if needed
        if ext in ['.bmp', '.tiff']:
            ext = '.jpg'
        
        output_file = output_path / f"{stem}{suffix}{ext}"
        
        # Skip if output file already exists
        if output_file.exists():
            print(f"Skipping {img_file.name} (output already exists)")
            continue
        
        print(f"Processing: {img_file.name}")
        
        original_size, new_size, size_reduction = resize_image_for_web(
            str(img_file), str(output_file), max_width, max_height, quality
        )
        
        if original_size and new_size:
            print(f"  {original_size[0]}x{original_size[1]} → {new_size[0]}x{new_size[1]}")
            print(f"  File size reduced by {size_reduction:.1f}%")
            
            total_original_size += os.path.getsize(str(img_file))
            total_new_size += os.path.getsize(str(output_file))
            successful_conversions += 1
        
        print()
    
    # Summary
    if successful_conversions > 0:
        overall_reduction = ((total_original_size - total_new_size) / total_original_size) * 100
        print(f"Successfully processed {successful_conversions} images")
        print(f"Total file size reduction: {overall_reduction:.1f}%")
        print(f"Original total: {total_original_size / (1024*1024):.1f} MB")
        print(f"New total: {total_new_size / (1024*1024):.1f} MB")

def main():
    parser = argparse.ArgumentParser(description="Resize images for web use")
    parser.add_argument("input_dir", help="Directory containing input images")
    parser.add_argument("-o", "--output", help="Output directory (default: same as input)")
    parser.add_argument("-w", "--width", type=int, default=1920, help="Maximum width (default: 1920)")
    parser.add_argument("--height", type=int, default=1080, help="Maximum height (default: 1080)")
    parser.add_argument("-q", "--quality", type=int, default=85, help="JPEG quality 1-100 (default: 85)")
    parser.add_argument("-s", "--suffix", default="_web", help="Suffix for output files (default: _web)")
    
    # Handle the conflict with built-in -h/--help
    args = parser.parse_args()
    
    # Validate quality
    if not 1 <= args.quality <= 100:
        print("Error: Quality must be between 1 and 100")
        sys.exit(1)
    
    process_images(
        input_dir=args.input_dir,
        output_dir=args.output,
        max_width=args.width,
        max_height=args.height,
        quality=args.quality,
        suffix=args.suffix
    )

if __name__ == "__main__":
    # Example usage when run directly
    if len(sys.argv) == 1:
        print("Image Resizer for Web")
        print("=" * 30)
        print()
        print("Usage examples:")
        print("  python resize_images.py /path/to/images")
        print("  python resize_images.py /path/to/images -o /path/to/output")
        print("  python resize_images.py /path/to/images -w 1200 -h 800 -q 90")
        print()
        print("Quick test with current directory:")
        
        # Process current directory if it contains images
        current_dir = "."
        process_images(current_dir, max_width=1200, max_height=800, quality=85)
    else:
        main()
